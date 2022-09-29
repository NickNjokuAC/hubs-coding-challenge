import React from "react";
import { FormattedMessage } from "react-intl";
import { createAndRedirectToNewHub } from "../../utils/phoenix-utils";
import { Button } from "../input/Button";
import { useCssBreakpoints } from "react-use-css-breakpoints";

export function HaveRoomCodeButton() {
  const breakpoint = useCssBreakpoints();

  return (
    <Button
      as="a"
      href="/link"
      thick={breakpoint === "sm" || breakpoint === "md"}
      xl={breakpoint !== "sm" && breakpoint !== "md"}
      preset="landingSecondary"
    >
      <FormattedMessage id="home-page.have-code" defaultMessage="Have a room code?" />
    </Button>
  );
}
