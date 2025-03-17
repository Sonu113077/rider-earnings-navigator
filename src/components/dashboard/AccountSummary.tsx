
import { Card, CardContent } from "@/components/ui/card";
import { User, Calendar, Truck, Clock, MapPin, IndianRupee } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const AccountSummary = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCardClick = (path: string, title: string) => {
    navigate(path);
    toast.success(`Navigating to ${title}`);
  };
  
  const accountCards = [
    {
      title: "Profile",
      icon: User,
      content: "Update your personal information",
      action: () => handleCardClick("/dashboard/profile", "Profile"),
      color: "bg-blue-500"
    },
    {
      title: "Next Payment",
      icon: Calendar,
      content: "Dec 15, 2023 · ₹1,250 estimated",
      action: () => handleCardClick("/dashboard/search", "Payment Search"),
      color: "bg-green-500"
    },
    {
      title: "Active Routes",
      icon: Truck,
      content: "3 routes assigned",
      action: () => handleCardClick("/dashboard/reports", "Reports"),
      color: "bg-purple-500"
    },
    {
      title: "Hours Logged",
      icon: Clock,
      content: "32 hours this week",
      action: () => handleCardClick("/dashboard/reports", "Reports"),
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {accountCards.map((card, index) => (
        <Card 
          key={index} 
          className="cursor-pointer hover:shadow-md transition-shadow transform hover:scale-105 duration-200"
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
