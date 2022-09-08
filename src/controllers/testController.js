const testHello = (req, res) => {
  return res.status(200).json({
    EM: "No error",
    EC: 0,
    DT: "Hello from backend",
  });
};

module.exports = {
  testHello,
};
