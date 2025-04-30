import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '@/store/authSlice';
import { SidebarMenuButton } from '@/components/ui/sidebar';
import { LogOutIcon } from 'lucide-react';

interface LogoutButtonProps {
  className?: string;
}

export function LogoutButton({ className }: LogoutButtonProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(logout());
    navigate('/login');
  };

  return (
    <SidebarMenuButton onClick={handleLogout} className={className}>
      <LogOutIcon />
      <span>Logout</span>
    </SidebarMenuButton>
  );
}
