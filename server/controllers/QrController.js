import { QR } from "../models/QRModel.js";

export const createQR = async (req, res) => {
  try {
    const { userIP, userId, imgUrl, redirectTo, isVerifiedUser, description, slug } = req.body;

    if (!imgUrl || !redirectTo) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const userQR = new QR({
      userId,
      userIP,
      imgUrl,
      redirectTo,
      isVerifiedUser,
      description,
      slug
    });

    await userQR.save();

    return res.status(200).json({
      message: "QR Created!",
      qr: userQR,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const updateQR = async (req, res) => {
  try {
    const { redirectTo, description, userId } = req.body;
    const qrId = req.params.qrId;

    if (!redirectTo || !userId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const QrUpdate = await QR.findByIdAndUpdate(qrId, {
      redirectTo: redirectTo,
      description: description,
      updatedAt: Date.now(),
    });

    if (!QrUpdate) {
      return res.status(400).json({
        message: "Failed to update!",
      });
    }

    return res.status(200).json({
      message: "QR code has been updated!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const deleteQR = async (req, res) => {
  try {
    const qrId = req.params.qrId;

    if (!qrId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const deletedQR = await QR.findByIdAndDelete(qrId);

    if (!deletedQR) {
      return res.status(400).json({
        message: "Failed to delete!",
      });
    }

    return res.status(200).json({
      message: "QR code has been deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const getQRs = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const findQRs = await QR.find({ userId: userId });

    if (findQRs.length == 0) {
      return res.status(400).json({
        message: "Failed to get QRs",
      });
    }

    return res.status(200).json({
      message: "Successful!",
      qr: findQRs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const getQR = async (req, res) => {
  try {
    const qrId = req.params.qrId;

    if (!qrId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const findQRs = await QR.findOne({ _id: qrId });

    if (findQRs.length == 0) {
      return res.status(400).json({
        message: "Failed to get QRs",
      });
    }

    return res.status(200).json({
      message: "Successful!",
      qr: findQRs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

// For User

export const createQRForUser = async (req, res) => {
  try {
    const { userIP, userId, imgUrl, redirectTo, isVerifiedUser, slug, description } = req.body;

    if (!imgUrl || !redirectTo) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const userQR = new QR({
      userId,
      userIP,
      imgUrl,
      redirectTo,
      isVerifiedUser,
      slug,
      description
    });

    await userQR.save();

    return res.status(200).json({
      message: "QR Created!",
      qr: userQR,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const updateQRForUser = async (req, res) => {
  try {
    const { redirectTo, description, userId } = req.body;
    const qrId = req.params.qrId;

    if (!redirectTo || !userId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const QrUpdate = await QR.findByIdAndUpdate(qrId, {
      redirectTo,
      description,
      updatedAt: Date.now(),
    });

    if (!QrUpdate) {
      return res.status(400).json({
        message: "Failed to update!",
      });
    }

    return res.status(200).json({
      message: "QR code has been updated!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const deleteQRForUser = async (req, res) => {
  try {
    const qrId = req.params.qrId;

    if (!qrId) {
      return res.status(400).json({
        message: "Invalid Credientials!",
      });
    }

    const deleteQR = await QR.findByIdAndDelete(qrId);

    if (!deleteQR) {
      return res.status(400).json({
        message: "Failed to delete!",
      });
    }

    return res.status(200).json({
      message: "QR code has been deleted!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};

export const getQRForUser = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const findQRs = await QR.find({ userId: userId });

    if (!findQRs) {
      return res.status(400).json({
        message: "Failed to get QRs",
      });
    }

    return res.status(200).json({
      message: "Successful!",
      qr: findQRs,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};


export const redirectForQr = async (req, res) => {
  try {
    const slug = req.params.slug;
    const userDevice = req.useragent;
    if (!slug) {
      return res.status(400).json({
        message: "Invalid QR Code",
      });
    }

    const findQR = await QR.findOne({ slug: slug });
    const redirectUrl = findQR.redirectTo;

    const todayDate = new Date()
    const lastDate = new Date(findQR.dailyScans.date);

    findQR.scans += 1;

    if (todayDate !== lastDate) {
      findQR.dailyScans.count = 1;
      findQR.dailyScans.date = Date.now();
    } else {
      findQR.dailyScans.count += 1;
    }

    if (userDevice.isMobile) {
      findQR.deviceStats.mobile += 1;
    } else {
      findQR.deviceStats.desktop += 1;
    }

    findQR.lastUpdateAt = Date.now();

    await findQR.save();
    return res.redirect(redirectUrl);
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err.message,
    });
  }
};
