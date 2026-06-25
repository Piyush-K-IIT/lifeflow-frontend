import React from "react";
import { X, User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const UserModal = ({ open, user, onClose }) => {

  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative">

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-6 right-6 hover:text-red-600"
        >
          <X size={24} />
        </button>

        {/* Header */}

        <div className="flex items-center gap-5 mb-8">

          <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center">

            <User
              size={40}
              className="text-red-600"
            />

          </div>

          <div>

            <h2 className="text-3xl font-black">
              {user.name}
            </h2>

            <p className="text-gray-500">
              {user.role.toUpperCase()}
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <Info
            icon={<Mail size={18} />}
            label="Email"
            value={user.email}
          />

          <Info
            icon={<Phone size={18} />}
            label="Phone"
            value={user.phone}
          />

          <Info
            icon={<MapPin size={18} />}
            label="Location"
            value={user.location}
          />

          <Info
            icon={<Calendar size={18} />}
            label="Joined"
            value={new Date(user.createdAt).toLocaleDateString()}
          />

          <Info
            label="Blood Group"
            value={user.bloodGroup || "-"}
          />

          <Info
            label="Reward Points"
            value={user.rewardPoints ?? 0}
          />

          <Info
            label="Total Donations"
            value={user.totalDonations ?? 0}
          />

          <Info
            label="Status"
            value={user.isBlocked ? "Blocked" : "Active"}
          />

        </div>

      </div>

    </div>
  );

};

const Info = ({ icon, label, value }) => (

  <div className="border rounded-2xl p-4">

    <div className="flex items-center gap-2 text-gray-500 mb-2">

      {icon}

      <span className="text-sm">

        {label}

      </span>

    </div>

    <div className="font-bold text-lg">

      {value}

    </div>

  </div>

);

export default UserModal;