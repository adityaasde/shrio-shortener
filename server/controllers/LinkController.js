import { Link } from "../models/LinkModel.js";

export const createShortUrl = async (req, res) => {
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
    const shortId = req.params.shortId;
    if (!shortId) {
      return res.status(400).json({
        message: "Expired Short Link!",
      });
    }

    
  } catch (err) {}
};
