import UserProfileForm from '../../components/SettingsForm/UserProfileForm';
import PasswordForm from '../../components/SettingsForm/PasswordForm';
// import AddressForm from '../../components/SettingsForm/AddressForm';

export default function Account() {
    return (
      <main className="col-lg-6">
        <p className="titleText">User Account Settings</p>
        <UserProfileForm />
        <PasswordForm />
        {/* <AddressForm /> */}
      </main>
    );
  }