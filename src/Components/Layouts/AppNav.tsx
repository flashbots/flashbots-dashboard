import { CloseCirceSvg, NavLink } from "@chainsafe/common-components"
import { createStyles, ITheme, makeStyles, useOnClickOutside } from "@chainsafe/common-theme"
import clsx from "clsx"
import React, { useRef } from "react"
import { useDashboard } from "../../Contexts/DashboardContext/DashboardContext"
import { Dashboard } from "../../Contexts/DashboardContext/Types"
import { ROUTE_LINKS } from "../Routes"

const useStyles = makeStyles(
  ({ constants, breakpoints, zIndex, animation, palette }: ITheme) => {
    return createStyles({
      root: {
        position: "fixed",
        zIndex: zIndex?.blocker,
        top: 0,
        right: 0,
        height: "100%",
        transitionDuration: `${animation.translate}ms`,
        width: 0,
        opacity: 0,
        visibility: "hidden",
        "&.active": {
          opacity: 1,
          visibility: "visible",
          [breakpoints.up("xs")]: {
            width: "100%"
          },
          [breakpoints.up("sm")]: {
            width: "80vw"
          },
          [breakpoints.up("md")]: {
            width: "60vw"
          },
          [breakpoints.up("lg")]: {
            width: 450
          },
        }
      },
      nav: {
        backgroundColor: palette.common.white.main,
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        [breakpoints.up("xs")]: {
          width: "100%"
        },
        [breakpoints.up("sm")]: {
          width: "80vw"
        },
        [breakpoints.up("md")]: {
          width: "60vw"
        },
        [breakpoints.up("lg")]: {
          width: 450
        },
      },
      link: {
        padding: `2rem 0`,
        textDecoration: "none",
        textAlign: "center",
        display: "block",
        fontSize: "3rem",
        transitionDuration: `${animation.transform}ms`,
        "&:hover": {
          textDecoration: "underline",
        }
      },
      close: {
        position: "absolute",
        top: constants.generalUnit * 3,
        right: constants.generalUnit * 3,
        cursor: "pointer",
        "& svg": {
          width: 50,
          height: 50
        }
      },
      currencySelector: {
        fontSize: "1.5rem",
        display: "inline-flex",
        cursor: "pointer",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        bottom: constants.generalUnit * 2,
        "& svg": {
          width: constants.generalUnit * 3,
          height: constants.generalUnit * 3,
          marginBottom: constants.generalUnit * 2
        },
        "& span span": {
          textTransform: "uppercase"
        }
      }
    })
  },
)

interface IAppNav {
  active: boolean
  close: () => void
}

const AppNav = ({
  active,
  close
}: IAppNav) => {
  const classes = useStyles()
  const ref = useRef(null)
  useOnClickOutside(ref, () => close())
  const { endpoints } = useDashboard()
  console.log("asdasd", endpoints)

  return <section ref={ref} className={clsx(
    classes.root,{
      "active": active
    }
  )}>
    <nav className={classes.nav}>
      <div className={classes.close}>
        <CloseCirceSvg onClick={() => close()} />
      </div>
      {
        endpoints.map((dashboard: Dashboard, index: number) => (<NavLink onClick={() => close()} className={classes.link} key={`nav-link-${index}`} to={ROUTE_LINKS.Dashboard(dashboard.name.toLocaleLowerCase())} >
          {dashboard.name}
        </NavLink>))
      }
    </nav>
  </section>
}

export default AppNav
