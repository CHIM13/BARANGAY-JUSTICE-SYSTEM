export interface MedicationDetails {
  mediator: {
    _id: string;
    user: {
      firstName: string;
      lastName: string;
      email: string;
      phoneNumber: string;
    };
  };
  scheduledDate: Date;
  status: string;
  remarks: string;
}
