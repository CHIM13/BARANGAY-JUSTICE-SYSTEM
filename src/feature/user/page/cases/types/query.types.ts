import { MedicationDetails } from "@/feature/shared/mediation/types";
import { Pagination } from "@/feature/shared/other/interface/server.interface";

export interface Case {
  _id?: string;
  caseNumber: string;
  participants: string;

  natureOfDispute: string;

  disputeDetails: {
    type: string;
    description: string;
    incidentDate: Date;
    location: string;
  };

  mediationDetails: MedicationDetails;

  timeline?: {
    action: string;
    date: Date;
    actor: string;
    remarks: string;
  }[];

  settlement?: {
    date: Date;
    type: string;
    remarks: string;
  };

  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CasePaginationResponse {
  data: Case[];
  pagination: Pagination;
}
