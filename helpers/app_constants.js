module.exports = class AppConstants {
  static userType = {
    normal: "NORMAL",
    super: "SUPER",
  };

  static areaType = {
    powerRoom: "POWER_ROOM",
    podArea: "POD_AREA",
    batteryRoom: "BATTERY_ROOM",
    corridor: "CORRIDOR",
    lvRoom: "LV_ROOM",
    mmrRoom: "MMR_ROOM",
    mvRoom: "MV_ROOM",
    trRoom: "TR_ROOM",
    gensetRoom: "GENSET_ROOM",
  };
  static batteryType = {
    vrla: "VRLA",
    lithium: "LITHIUM",
  };
  static ventilationType = {
    noVentilation: "VENTILATION_ONLY",
    ventilationOnly: "VENTILATION_ONLY",
    ventilationWithPress: "VENTILATION_WITH_PRESSURIZATION",
  };

  static emailReceptor = {
    emailSubject: "Account verification",
    emailMsg: "Your OTP is ",
  };
  // static accVerification = "Account verification";
};
