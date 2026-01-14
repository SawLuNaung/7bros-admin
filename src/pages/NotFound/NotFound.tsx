import React from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

const NotFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="p-8 text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-800">404!</h1>
        <h2 className="text-2xl font-medium text-gray-600">Page Not Found</h2>
        <p className="text-gray-500">
          Sorry, the page you are looking for doesn’t exist.
        </p>
        <Button
          onClick={() => window.history.back()}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Go Back
        </Button>
      </Card>
    </div>
  );
};

export default NotFound;
