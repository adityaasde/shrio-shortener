import { Link } from "../models/LinkModel.js";

export const createShortUrl = async (req, res) => {
  try {
    const {
      userIp,
      redirectTo,
      slug,
      expiryDate,
      description,
      userId,
      isVerifiedUser,
    } = req.body;

    if (!redirectTo) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const newLink = new Link({
      userIp,
      userId,
      redirectTo,
      slug,
      expiryDate,
      description,
      isVerifiedUser,
    });

    await newLink.save();
    return res.status(200).json({
      message: "Short URL has been Created!",
      url: newLink,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
      errMsg: err,
    });
  }
};

export const updateShortUrl = async (req, res) => {
  try {
    const { slug, description, expiryDate, userId } = req.body;
    const linkId = req.params.linkId;

    if (!slug || !description || !expiryDate || !userId || !linkId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const isShortUrlExist = await Link.findByIdAndUpdate(linkId, {
      slug,
      description,
      expiryDate,
      updatedAt: Date.now(),
    });

    if (!isShortUrlExist) {
      return res.status(400).json({
        message: "Failed to update!",
      });
    }

    return res.status(200).json({
      message: "Short URL has been updated!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      errMsg: err,
    });
  }
};

export const deleteShortUrl = async (req, res) => {
  try {
    const urlId = req.params.urlId;
    if (!urlId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const isDelete = await Link.findByIdAndDelete(urlId);

    if (!isDelete) {
      return res.status(400).json({
        message: "Failed to delete!",
      });
    }

    return res.status(200).json({
      message: "Short URL has been deleted.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      errMsg: err,
    });
  }
};

export const getShortUrl = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const searchLinks = await Link.find({ userId: userId });

    return res.status(200).json({
      message: "Successful",
      links: searchLinks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      errMsg: err,
    });
  }
};

// For Users

export const createShortUrlForUser = async (req, res) => {
  try {
    const {
      userIP,
      redirectTo,
      slug,
      expiryDate,
      description,
      userId,
      isVerifiedUser,
    } = req.body;

    if (!redirectTo) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const newLink = new Link({
      userIP,
      userId,
      redirectTo,
      slug,
      expiryDate,
      description,
      isVerifiedUser,
    });

    await newLink.save();
    return res.status(200).json({
      message: "Short URL has been Created!",
      url: newLink,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error!",
      errMsg: err,
    });
  }
};

export const updateShortUrlForUser = async (req, res) => {
  try {
    const { slug, description, expiryDate, userId } = req.body;
    const linkId = req.params.linkId;

    if (!slug || !description || !expiryDate || !userId || !linkId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const isShortUrlExist = await Link.findByIdAndUpdate(linkId, {
      slug,
      description,
      expiryDate,
      updatedAt: Date.now(),
    });

    if (!isShortUrlExist) {
      return res.status(400).json({
        message: "Failed to update!",
      });
    }

    return res.status(200).json({
      message: "Short URL has been updated!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error",
      errMsg: err,
    });
  }
};

export const deleteShortUrlForUser = async (req, res) => {
  try {
    const urlId = req.params.urlId;
    if (!urlId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const isDelete = await Link.findByIdAndDelete(urlId);

    if (!isDelete) {
      return res.status(400).json({
        message: "Failed to delete!",
      });
    }

    return res.status(200).json({
      message: "Short URL has been deleted.",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      errMsg: err,
    });
  }
};

export const getShortUrlForUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const searchLinks = await Link.find({ userId: userId });

    return res.status(200).json({
      message: "Successful",
      links: searchLinks,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal Server Error!",
      errMsg: err,
    });
  }
};

export const redirectTo = async (req, res) => {
  try {
    const slug = req.params.slug;
    const userDevice = req.useragent;
    if (!slug) {
      return res.status(400).json({
        message: "Expired Short Link!",
      });
    }

    const findLink = await Link.findOne({ slug: slug });
    const redirectUrl = findLink.redirectTo;

    const isExpired = findLink.expiryDate.getTime() > Date.now();

    if (!isExpired) {
      return res.status(400).json({
        message: "Short Link is expired!"
      });
    }

    const todayDate = new Date().toDateString();
    const lastDate = findLink.dailyClicks.date.toDateString();

    findLink.clicks += 1;

    if (todayDate !== lastDate) {
      findLink.dailyClicks.count = 1;
      findLink.dailyClicks.date = Date.now();
    } else {
      findLink.dailyClicks.count += 1;
    }

    if (userDevice.isMobile) {
      findLink.deviceStats.mobile += 1;
    } else {
      findLink.deviceStats.desktop += 1;
    }

    findLink.lastUpdateAt = Date.now();

    await findLink.save();
    return res.redirect(redirectUrl);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};
