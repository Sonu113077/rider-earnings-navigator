
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Truck, Clock, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const AccountSummary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const accountCards = [
    {
      title: "Profile",
      icon: User,
      content: "Update your personal information",
      action: () => navigate("/dashboard/profile"),
      color: "bg-blue-500"
    },
    {
      title: "Next Payment",
      icon: Calendar,
      content: "Dec 15, 2023 · $1,250 estimated",
      action: () => navigate("/dashboard/search"),
      color: "bg-green-500"
    },
    {
      title: "Active Routes",
      icon: Truck,
      content: "3 routes assigned",
      action: () => navigate("/dashboard/reports"),
      color: "bg-purple-500"
    },
    {
      title: "Hours Logged",
      icon: Clock,
      content: "32 hours this week",
      action: () => navigate("/dashboard/reports"),
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {accountCards.map((card, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={card.action}
        >
          <CardContent className="p-4 flex items-center">
            <div className={`p-3 rounded-full ${card.color} text-white mr-4`}>
              <card.icon size={20} />
            </div>
            <div>
              <h3 className="font-medium">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.content}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AccountSummary;
