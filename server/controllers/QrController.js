import { QR } from "../models/QRModel.js";

export const createQR = async (req, res) => {
  try {
    const { userIP, userId, imgUrl, redirectTo, expiryDate, isVerifiedUser } =
      req.body;

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
      expiryDate,
    });

    await userQR.save();

    return res.status(200).json({
      message: "QR Created!",
      qr: userQR,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const updateQR = async (req, res) => {
  try {
    const { expiryDate, redirectTo, description, userId } = req.body;
    const qrId = req.params.qrId;

    if (!redirectTo || !expiryDate || !userId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const QrUpdate = await QR.findByIdAndUpdate(qrId, {
      redirectTo,
      expiryDate,
      description,
      updatedAt: Date.now(),
    });

    if (!QrUpdate) {
      return res.status(400).json({
        message: "Failed to update!",
      });
    }

    return res.status(200).json({
      message: "QR has been updated!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
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
      errMsg: err,
    });
  }
};

export const getQR = async (req, res) => {
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
      errMsg: err,
    });
  }
};

// For User

export const createQRForUser = async (req, res) => {
  try {
    const { userIP, userId, imgUrl, redirectTo, expiryDate, isVerifiedUser } =
      req.body;

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
      expiryDate,
    });

    await userQR.save();

    return res.status(200).json({
      message: "QR Created!",
      qr: userQR,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
    });
  }
};

export const updateQRForUser = async (req, res) => {
  try {
    const { expiryDate, redirectTo, description, userId } = req.body;
    const qrId = req.params.qrId;

    if (!redirectTo || !expiryDate || !userId) {
      return res.status(400).json({
        message: "Invalid credientials!",
      });
    }

    const QrUpdate = await QR.findByIdAndUpdate(qrId, {
      redirectTo,
      expiryDate,
      description,
      updatedAt: Date.now(),
    });

    if (!QrUpdate) {
      return res.status(400).json({
        message: "Failed to update!",
      });
    }

    return res.status(200).json({
      message: "QR has been updated!",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error!",
      errMsg: err,
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
      errMsg: err,
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
      errMsg: err,
    });
  }
};
