import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/common/components/atoms/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";
import { XStack } from "@/common/components/atoms/ui/stack";
import CaseCardMoreOption from "../../../dropdown/case/case-card-more-option";
import { Avatar } from "@/common/components/atoms/ui/avatar";

interface CasePartyInformationCardProps {
  title: string;
  partyInfo: {
    name: string;
    gender: string;
    email: string;
    phone: string;
    address: string;
    avatarSrc?: string;
    avatarFallback: string;
  };
  partyType: "compliant" | "respondent";
  className?: string;
}

const CasePartyInformationCard = ({
  title,
  partyInfo,
  partyType,
  className = "",
}: CasePartyInformationCardProps) => {
  const { name, gender, email, phone, address, avatarSrc, avatarFallback } =
    partyInfo;

  return (
    <Card className={`mb-6 ${className}`}>
      <CardHeader>
        <XStack className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CaseCardMoreOption partyType={partyType} />
        </XStack>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Avatar src={avatarSrc ?? ""} fallback={avatarFallback} />
            <div>
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{gender}</p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{email}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm">{phone}</p>
            </div>
          </div>
          <div className="col-span-full flex items-start space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
            <p className="text-sm">{address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CasePartyInformationCard;
