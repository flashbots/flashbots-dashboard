import {
  createStyles,
  ITheme,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@chainsafe/common-theme"
import React, { useState } from "react"
import clsx from "clsx"
import { HamburgerMenu, Link, NavLink, Typography } from "@chainsafe/common-components"
import AppNav from "./AppNav"
import { ROUTE_LINKS } from "../Routes"
import LogoPng from "../../Media/Robot_Emoji_OG.png"
import { useDashboard } from "../../Contexts/DashboardContext/DashboardContext"
import { Dashboard } from "../../Contexts/DashboardContext/Types"

const useStyles = makeStyles(
  ({ constants, breakpoints, palette, typography, zIndex }: ITheme) => {
    return createStyles({
      root: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: `${constants.headerHeight}px`,
        padding: `0 ${constants.generalUnit * 3}px`,
        backgroundColor: palette.additional.black as string,
        zIndex: zIndex?.blocker,
        [breakpoints.down("md")]: {
          justifyContent: "flex-start",
          padding: `0 ${constants.generalUnit * 2}px`,
        },
        [breakpoints.up("md")]: {
          justifyContent: "space-around",
        },
      },
      logo: {
        display: "block",
        position: "relative",
        height: 46,
        width: constants.logoSize as number,
        lineHeight: "46px",
        "& img": {
          width: constants.logoSize as number,
          height: constants.logoSize as number,
          display: "block",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% - 2px))"
        },
      },
      title: {
        cursor: "pointer",
        color: palette.additional.white as string,
        textDecoration: "none",
        display: "flex",
        alignItems: "center",
        "& span": {
          borderBottom: "none",
          fontWeight: typography.fontWeight.regular,
          margin: 0,
          fontSize: 32,
          padding: 0,
          display: "inline-block",
          verticalAlign: "center"
        },

        "& sub": {
          fontSize: 24,
        },
        "& a":{
          color: palette.additional.white as string,
          textDecoration: "none",
          "&:first-child": {
            // ICON
            marginRight: constants.generalUnit / 2
          }
        }
      },
      menuButton: {
        position: "absolute",
        transform: "translate(0, -50%) rotateY(180deg)",
        right: constants.generalUnit * 2,
        top: "50%",
        "& span": {
          backgroundColor: palette.additional.white as string
        }
      },
      desktopNav: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        flex: "1 1 0",
        height: "100%",
        alignItems: "center",
        "& > *": {
          padding: `0 ${constants.generalUnit * 5}px`
        }
      },
      link: {
        fontSize: 24,
        color: palette.additional.white as string,
        textDecoration: "none",
        fontWeight: typography.fontWeight.regular,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%",
        "&.active": {
          fontWeight: typography.fontWeight.bold
        }
      },
      currencySelector: {
        fontSize: 24,
        textDecoration: "none",
        textTransform: "uppercase",
        fontWeight: typography.fontWeight.regular,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        "& svg": {
          width: 20,
          height: 20,
          marginRight: constants.generalUnit
        },
      }
    })
  },
)

const AppHeader = () => {
  const classes = useStyles()

  const [navOpen, setNavOpen] = useState(false)

  const { breakpoints }: ITheme = useTheme()
  const desktop = useMediaQuery(breakpoints.up("md"))
  const { endpoints } = useDashboard()

  return (
    <header
      className={clsx(classes.root)}
    >
       <div className={classes.title}>
         <a rel="noopener noreferrer" target="_blank" href="https://github.com/flashbots/pm" className={classes.logo}>
          <img alt="robot emoji" src={LogoPng} />
         </a>
         <Link to={ROUTE_LINKS.Dashboard("network")}>
          <Typography variant="h1">
            Flashbots Dashboard<sub>&nbsp;v0</sub>
          </Typography>
         </Link>
      </div>
      {
        desktop && (<section className={classes.desktopNav}>
          {
            endpoints.map((dashboard: Dashboard, index: number) => (<NavLink className={classes.link} key={`nav-link-${index}`} to={ROUTE_LINKS.Dashboard(dashboard.name.toLocaleLowerCase())} >
              {dashboard.name}
            </NavLink>))
          }
        </section>)
      }
      {
        !desktop && <>
          <div
            className={classes.menuButton}
          >
            <HamburgerMenu
              onClick={() => setNavOpen(!navOpen)}
              variant={navOpen ? "active" : "default"}
            />
          </div>
          <AppNav close={() => setNavOpen(false)} active={navOpen} />
        </>
      }
    </header>
  )
}

export default AppHeader
