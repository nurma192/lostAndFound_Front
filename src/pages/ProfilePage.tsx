import React, {useEffect, useState} from 'react';
import ListBox from "../components/ListBox";
import ProfileInformationPage from "./ProfileInformationPage";
import ChangePasswordPage from "./ChangePasswordPage";
import MyItemsPage from "./MyItemsPage";
import {useAuth} from "../hooks/useAuth";

export type ActiveSection = 'profile' | 'lost' | 'found' | 'logout' | 'changePassword';

function ProfilePage() {
    const [activeSection, setActiveSection] = useState<ActiveSection>('profile');

    const auth = useAuth()
    useEffect(() => {
        if (activeSection === 'logout'){
            auth.logout()
        }
    }, [activeSection]);
    return (
        <div className={`w-full flex gap-6`}>
            <div className="w-1/5 max-w-[260px]">
                <ListBox variant={activeSection} setVariants={setActiveSection}/>
            </div>
            <div className="w-4/5">
                {activeSection === 'profile' && (<ProfileInformationPage />)}
                {(activeSection === 'lost' || activeSection === 'found') && (<MyItemsPage activeSection={activeSection}/>)}
                {activeSection === 'changePassword' && (<ChangePasswordPage />)}
            </div>
        </div>
    )
        ;
}




export default ProfilePage;
