class adminController {
  async dashboard(req, res) {
    return res.status(200).json({
      success: true,
      message: "Админ доступ разрешён",
    });
  }
}

module.exports = new adminController();