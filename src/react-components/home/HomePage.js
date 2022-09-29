import React, { useContext, useEffect } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import classNames from "classnames";
import configs from "../../utils/configs";
import { CreateRoomButton } from "./CreateRoomButton";
import { PWAButton } from "./PWAButton";
import { useFavoriteRooms } from "./useFavoriteRooms";
import { usePublicRooms } from "./usePublicRooms";
import styles from "./HomePage.scss";
import { AuthContext } from "../auth/AuthContext";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { MediaGrid } from "../room/MediaGrid";
import { MediaTile } from "../room/MediaTiles";
import { PageContainer } from "../layout/PageContainer";
import { scaledThumbnailUrlFor } from "../../utils/media-url-utils";
import { Column } from "../layout/Column";
import { Button } from "../input/Button";
import { Container } from "../layout/Container";
import { SocialBar } from "../home/SocialBar";
import { SignInButton } from "./SignInButton";
import { AppLogo } from "../misc/AppLogo";
import { isHmc } from "../../utils/isHmc";
import maskEmail from "../../utils/mask-email";
import appLogo from "../../assets/images/NN_Studios_cropped.png";
import styled from "styled-components";
import { HaveRoomCodeButton } from "./HaveRoomCodeButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const Header = styled.div`
  dsiplay: flex;
  text-align: center;
  font-size: 128px;
  font-family: "Palanquin";
  font-weight: 700;
`;

const LeftGraphicContainer = styled.div`
  
`;

const LeftGraphicOne = styled.div`
  //position: absolute;
  width: 47.66px;
  height: 101.91px;
  //left: 83.65px;
  //top: 364.74px;
  margin-bottom: 50px;
  background: #ed813e;
  border-radius: 26px;
  transform: rotate(-30.11deg);
`;

const LeftGraphicTwo = styled.div`
  //position: absolute;
  width: 52.57px;
  height: 32px;
  //left: 139.52px;
  //top: 500px;

  background: #5a4ae3;
  border-radius: 22px;
  transform: rotate(17.31deg);
  margin-bottom: 70px;
`;

const LeftGraphicThree = styled.div`
//position: absolute;
width: 92px;
height: 32px;
//left: 151.52px;
//top: 633px;

background: #5A4AE3;
border-radius: 11px;
transform: rotate(17.31deg);

`;

const RightGraphicContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding:15px;
`;

const RightGraphicOne = styled.div`
  //position: absolute;
  width: 45px;
  height: 45px;
  //left: 1491px;
  //top: 233px;
  border-radius: 100%;

  background: #5a4ae3;

  margin-bottom: 35px;
`;

const RightGraphicTwo = styled.div`
  //position: absolute;
  width: 47.66px;
  height: 101.91px;
  //left: 1529px;
  //top: 335.91px;

  background: #ed813e;
  border-radius: 26px;
  transform: rotate(-30.11deg);
`;

const RightGraphicThree = styled.div`
  //position: absolute;
  width: 92px;
  height: 32px;
  //left: 1555.19px;
  //top: 528.2px;
  margin-top: 60px;
  background: #5a4ae3;
  border-radius: 22px;
  transform: rotate(17.31deg);
`;

const SubHeader = styled.div``;

const LogoContainer = styled.div``;

export function HomePage() {
  const auth = useContext(AuthContext);
  const intl = useIntl();

  const { results: favoriteRooms } = useFavoriteRooms();
  const { results: publicRooms } = usePublicRooms();

  const sortedFavoriteRooms = Array.from(favoriteRooms).sort((a, b) => b.member_count - a.member_count);
  const sortedPublicRooms = Array.from(publicRooms).sort((a, b) => b.member_count - a.member_count);
  const wrapInBold = chunk => <b>{chunk}</b>;
  useEffect(() => {
    const qs = new URLSearchParams(location.search);

    // Support legacy sign in urls.
    if (qs.has("sign_in")) {
      const redirectUrl = new URL("/signin", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    } else if (qs.has("auth_topic")) {
      const redirectUrl = new URL("/verify", window.location);
      redirectUrl.search = location.search;
      window.location = redirectUrl;
    }

    if (qs.has("new")) {
      createAndRedirectToNewHub(null, null, true);
    }
  }, []);

  const canCreateRooms = !configs.feature("disable_room_creation") || auth.isAdmin;
  const email = auth.email;
  return (
    <PageContainer className={styles.homePage}>
      <Container>
        <div className={styles.leftContainer}>
          <LeftGraphicOne></LeftGraphicOne>
          <LeftGraphicTwo></LeftGraphicTwo>
          <LeftGraphicThree></LeftGraphicThree>
        </div>
        <div className={styles.hero}>
          {auth.isSignedIn ? (
            <div className={styles.signInContainer}>
              <span>
                <FormattedMessage
                  id="header.signed-in-as"
                  defaultMessage="Signed in as {email}"
                  values={{ email: maskEmail(email) }}
                />
              </span>
              <a href="#" onClick={auth.signOut} className={styles.mobileSignOut}>
                <FormattedMessage id="header.sign-out" defaultMessage="Sign Out" />
              </a>
            </div>
          ) : (
            <SignInButton mobile />
          )}
          <div className={styles.logoContainer}>
            <AppLogo />
          </div>
          <div className={styles.appInfo}>
            <Header className="styles.palanquin">HubsWorldNN</Header>
            <div className={styles.appDescription}>
              Gather share and collaborate together in a virtual, private and safe space
            </div>
            <div className={styles.heroImageContainer}>
              <img
                alt={intl.formatMessage(
                  {
                    id: "home-page.hero-image-alt",
                    defaultMessage: "Screenshot of {appName}"
                  },
                  { appName: configs.translation("app-name") }
                )}
                src={appLogo}
              />
            </div>
            <ButtonContainer>
              {canCreateRooms && <CreateRoomButton />}
              <HaveRoomCodeButton />
            </ButtonContainer>
            <PWAButton />
          </div>
        </div>
        <div className={styles.rightContainer}>
          <RightGraphicOne></RightGraphicOne>
          <RightGraphicTwo></RightGraphicTwo>
          <RightGraphicThree></RightGraphicThree>
        </div>
      </Container>

      <Container></Container>
      {isHmc() ? (
        <Column center>
          <SocialBar />
        </Column>
      ) : null}
    </PageContainer>
  );
}
