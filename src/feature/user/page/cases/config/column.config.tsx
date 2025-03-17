import { Badge } from "@/common/components/atoms/ui/badge";
import columnBuilder from "@/utils/table/column-builder.ts";
import ActionColumn from "@/common/components/molecules/table/columns/action-column";
import TextColumn from "@/common/components/molecules/table/columns/text-column";
import { Case } from "../types/query.types";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/common/components/atoms/ui/alert-dialog";
import useAcceptCase from "../hooks/use-accept-case";
import useRejectCase from "../hooks/use-reject-case";
import { useSearchParams } from "react-router-dom";

const caseColumns = columnBuilder<Case>([
  {
    id: "caseNumber",
    accessorKey: "caseNumber",
    header: "Case Number",
    cell: (props) => <TextColumn {...props} />,
  },
  {
    id: "natureOfDispute",
    accessorKey: "natureOfDispute",
    header: "Nature of Dispute",
  },
  {
    id: "caseType",
    accessorKey: "disputeDetails.type",
    header: "Case Type",
  },

  {
    id: "mediator",
    accessorKey: "mediationDetails.mediator",
    header: "Mediator",
    cell: ({ row }) => {
      const { firstName, lastName } =
        row.original.mediationDetails.mediator.user;

      return (
        <span>
          Hon. {lastName} {firstName}
        </span>
      );
    },
  },

  {
    id: "filingDate",
    accessorKey: "createdAt",
    header: "Filing Date",
    cell: ({ row }) => {
      const { createdAt } = row.original;

      const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      return <span>{formattedDate}</span>;
    },
  },

  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant={status === "Active" ? "default" : "secondary"}>
          {status}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: () => <div className="text-center mx-auto">Actions</div>,
    cell: ({ row }) => {
      const { _id } = row.original;
      const [searchParams] = useSearchParams();
      const type = searchParams.get("type");

      const { mutate: acceptCase } = useAcceptCase();
      const { mutate: rejectCase } = useRejectCase();

      const handleAcceptCase = () => {
        acceptCase(_id ?? "");
      };

      const handleRejectCase = () => {
        rejectCase(_id ?? "");
      };

      const respondentActions = [
        {
          id: "accept",
          title: "Accept",
          showModal: true,
          type: "modal",
          modalContent: (
            <div>
              <AlertDialogTitle className="text-xl font-bold mb-4">
                Are you sure you want to accept this case?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action will mark the case as accepted and the mediator will
                be notified.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleAcceptCase}>
                  Accept
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          ),
        },
        {
          id: "reject",
          title: "Reject",
          showModal: true,
          type: "modal",
          modalContent: (
            <div>
              <AlertDialogTitle className="text-xl font-bold mb-4">
                Are you sure you want to reject this case?
              </AlertDialogTitle>
              <AlertDialogDescription className="mb-4">
                This action will mark the case as rejected and the mediator will
                be notified.
              </AlertDialogDescription>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleRejectCase}>
                  Reject
                </AlertDialogAction>
              </AlertDialogFooter>
            </div>
          ),
        },
      ];

      const complainantAction: any[] = [];

      return (
        <ActionColumn
          actions={
            type === "respondent" ? respondentActions : complainantAction
          }
        />
      );
    },
  },
]);

export default caseColumns;
