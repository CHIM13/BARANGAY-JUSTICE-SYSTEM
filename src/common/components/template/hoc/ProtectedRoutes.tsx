// /* eslint-disable react-hooks/exhaustive-deps */
// import { useAuth } from "@/common/provider/AuthProvider";
// import { User } from "@/feature/shared/interface";
// import { FC, PropsWithChildren, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// interface Props extends PropsWithChildren {
//   allowedRoutes: Array<string>;
// }

// const ProtectedRoutes: FC<Props> = ({ allowedRoutes, children }) => {
//   const { user: currentUser } = useAuth();
//   const navigate = useNavigate();

//   // Check if the user exist
//   useEffect(() => {
//     if (currentUser === null) {
//       navigate("/");
//     }
//   }, [currentUser]);

//   // check of allowed roles
//   if (
//     currentUser ||
//     (allowedRoutes &&
//       !allowedRoutes.includes((currentUser as unknown as User)?.role))
//   ) {
//     return <div>Permission denied</div>;
//   }

//   return children;
// };

// export default ProtectedRoutes;
