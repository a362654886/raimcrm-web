export class Models {
  static getNewFamilyModel = () => [
    [
      ["Name", "input"],
      ["Relationship", "input"],
      ["Brithday", "day"],
      ["Phone", "input"],
      ["Email", "input"],
    ],
    [["Name", "Relationship", new Date(), "Phone", "Email"]],
    [],
  ];

  static getNewNoteModel = () => [
    [
      ["Time", "daytime"],
      ["Note Type", "select"],
      ["Context", "text"],
    ],
    [["2000-01-01", "nameString","context"]],
    [],
  ];

  static getNewAppointmentModel = () => [
    [
      ["Time", "daytime"],
      ["Task", "text"],
    ],
    [["2000-01-01", "Task"]],
    [],
  ];

  static getPropertyViewHistory = (): any => [
    [
      ["Time", "day"],
      ["Client name or phone", "inputselect", []],
      ["Context", "text"],
    ],
    [[new Date(), "", "Context"]],
    [],
  ];

  static getClientViewHistoryModel = (): any => [
    [
      ["Time", "day"],
      ["Property Address", "inputselect", []],
      ["Context", "text"],
    ],
    [[new Date(), "", "Context"]],
    [],
  ];

  static getNewAppraisal = () => [
    [
      ["Time", "daytime"],
      ["Range", "input"],
      ["User email", "button"],
    ],
    [[new Date(), "Range", "User email"]],
    [],
  ];
}
