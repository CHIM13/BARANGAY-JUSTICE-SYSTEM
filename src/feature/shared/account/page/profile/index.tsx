import useFetchProfile from "../../hooks/use-fetch-profile";

const ProfileScreen = () => {
  const { data } = useFetchProfile();

  console.log(data);
  return <div>ProfileScreen</div>;
};

export default ProfileScreen;
