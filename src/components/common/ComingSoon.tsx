import React from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Construction } from "lucide-react";

interface ComingSoonProps {
  title?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ title = "Coming Soon" }) => {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <Card className="p-12 text-center space-y-6 max-w-md w-full">
        <div className="flex justify-center">
          <Construction className="w-16 h-16 text-gray-400" />
        </div>
        <CardContent className="space-y-4 p-0">
          <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
          <p className="text-lg text-gray-500">
            This feature is under development and will be available soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
