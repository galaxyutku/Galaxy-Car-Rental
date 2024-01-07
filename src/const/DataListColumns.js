export const bookingColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "fullName",
      headerName: "Full name",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 120,
      valueGetter: (params) =>
        `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
    {
      field: "pickupDate",
      headerName: "Pickup Date",
      width: 110,
      editable: false,
    },
    {
        field: "dropoffDate",
        headerName: "Drop-off Date",
        width: 110,
        editable: false,
    },
    {
        field: "location",
        headerName: "Location",
        width: 160,
        editable: false,
    },
    {
        field: "pricePaid",
        headerName: "Price Paid",
        width: 110,
        editable: false,
    },
    {
        field: "carModel",
        headerName: "Car Model",
        width: 140,
        editable: false,
    },
    {
        field: "gearType",
        headerName: "Gear",
        width: 100,
        editable: false,
    },
    {
        field: "seatAmount",
        headerName: "Seat",
        width: 70,
        editable: false,
    },
    {
        field: "carPlate",
        headerName: "Car Plate",
        width: 110,
        editable: false,
    },
];

export const carColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "carModel",
      headerName: "Car Model",
      width: 110,
      editable: false,
    },
    {
        field: "carPlate",
        headerName: "Car Plate",
        width: 110,
        editable: false,
      },
      {
        field: "dailyPrice",
        headerName: "Daily Price",
        width: 110,
        editable: false,
      },
      {
        field: "gearType",
        headerName: "Gear Type",
        width: 110,
        editable: false,
      },
      {
        field: "location",
        headerName: "Location",
        width: 110,
        editable: false,
      },
      {
        field: "seatAmount",
        headerName: "Seat Amount",
        width: 110,
        editable: false,
      },
      {
        field: "carImageRef",
        headerName: "Car Image Link",
        width: 140,
        editable: false,
      },
];

export const userColumns = [
    { field: "id", headerName: "ID", width: 50 },
    {
      field: "userName",
      headerName: "Name",
      width: 110,
      editable: false,
    },
    {
        field: "userSurname",
        headerName: "Last Name",
        width: 110,
        editable: false,
      },
      {
        field: "userMail",
        headerName: "E-mail",
        width: 160,
        editable: false,
      },
];