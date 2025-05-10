import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./profile.css";

interface AdminProfile {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  nic: string;
  contact: string;
  image?: string;
}

const dummyProfile: AdminProfile = {
  firstName: "Uvindu",
  lastName: "Suraweera",
  email: "kavishkauvindu0@gmail.com",
  password: "Uvindu@123",
  confirmPassword: "Uvindu@123",
  nic: "200134603218",
  contact: "0742889331",
  image: "",
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem("adminProfile");
    setProfile(stored ? JSON.parse(stored) : dummyProfile);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    const updated = { ...profile, [name]: value };

    if (name === "password" || name === "confirmPassword") {
      setPasswordMatch(
        updated.password === updated.confirmPassword
          ? "Passwords are matching"
          : "Passwords do not match"
      );
    }

    setProfile(updated);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && profile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    if (!profile) return;
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      nic,
      contact,
    } = profile;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !nic ||
      !contact
    ) {
      toast.warn("All fields must be filled.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.warn("Please enter a valid email address.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (password !== confirmPassword) {
      toast.warn("Passwords do not match.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    localStorage.setItem("adminProfile", JSON.stringify(profile));
    setIsEditing(false);
    toast.success("Profile updated successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminProfile");
    toast.success("Logged Out successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    navigate("/admin-user");
  };

  if (!profile) {
    return (
      <div className="no-profile-message">
        No profile data found. Please log in.
      </div>
    );
  }

  const fields = [
    { label: "First Name", name: "firstName" },
    { label: "Last Name", name: "lastName" },
    { label: "Email", name: "email" },
    { label: "NIC", name: "nic" },
    { label: "Contact Number", name: "contact" },
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ];

  return (
    <div className="profile-page-container">
      <div className="profile-header-banner">
        <h2>Hello {profile.firstName}</h2>
        <p>
          This is your profile page. You can see the progress you've made with
          your work and manage your projects or assigned tasks
        </p>
        <Button
          type="button"
          onClick={() => setIsEditing(true)}
          className="edit-profile-btn"
        >
          Edit profile
        </Button>
      </div>

      <div className="profile-main-card">
        <div className="profile-left-section">
          <div className="profile-picture-container">
            <img
              src={
                profile.image ||
                "https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg"
              }
              alt="Profile"
              className="profile-picture"
            />
            {isEditing && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  hidden
                />
                <Button
                  onClick={triggerFileInput}
                  className="button-edit-picture"
                >
                  Change Picture
                </Button>
              </>
            )}
            <div className="admin-info-box">
              <div className="admin-info-item">
                <span className="admin-info-label">Role:</span>
                <span className="admin-info-value">Administrator</span>
              </div>
              <div className="admin-info-item">
                <span className="admin-info-label">Last Login:</span>
                <span className="admin-info-value">Apr 30, 2025 09:42 AM</span>
              </div>
              <div className="admin-info-item">
                <span className="admin-info-label">Access Level:</span>
                <span className="admin-info-value">Full</span>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right-section">
          {fields.map(({ label, name, type }) => (
            <div className="input-group" key={name}>
              <label className="input-label">{label}</label>
              <Input
                type={type || "text"}
                name={name}
                value={(profile as any)[name]}
                onChange={handleChange}
                disabled={!isEditing}
              />
            </div>
          ))}

          {isEditing && passwordMatch && (
            <div
              className={`text-sm font-medium ${
                passwordMatch.includes("not")
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {passwordMatch}
            </div>
          )}

          <div className="button-group">
            {isEditing ? (
              <>
                <Button
                  type="submit"
                  onClick={handleSave}
                  className="button-save"
                  disabled={passwordMatch?.includes("not")}
                >
                  Save
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="button-cancel"
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                onClick={handleLogout}
                className="button-delete"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
