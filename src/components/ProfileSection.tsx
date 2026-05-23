import type { ProfileGetResponseType } from "../dto/membership.dto"
import profileDummy from "../assets/images/profilePhoto.png"

const ProfileSection = ({ profileData }: { profileData?: ProfileGetResponseType }) => {
    const profilePic = profileData ? profileData.profile_image.includes("/take-home-test/null") ? profileDummy : profileData.profile_image : profileDummy
    return (
        <div className="md:col-span-5 col-span-12 flex flex-row md:flex-col items-start text-left space-x-8 md:space-x-0">
            <div className="w-16 h-16 rounded-full border border-gray-200 overflow-hidden mb-4 bg-gray-50 shrink-0">
                <img
                    src={profilePic}
                    alt="User Avatar"
                    className="w-full h-full object-cover"
                />
            </div>
            <div>
                <p className="text-gray-400 text-sm md:text-base font-light">Selamat datang,</p>
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 mt-1">
                    {profileData?.first_name}{' '}{profileData?.last_name}
                </h2>
            </div>
        </div>
    )
}

export default ProfileSection