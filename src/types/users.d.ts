import { UserSignUpType } from "@/model/UserSingUp";

interface UserTypes {
  _id: string;
  first_name: string;
  country_code: string | null;
  phone_number: string | null;
  email: string;
  last_name: string;
  roles: string[];
  googleId: string | null;
  picture: string | null;
  created_at: string;
}

interface RequestReturnLogin {
  status: string;
  data?: UserTypes;
}
