import React from "react";
import styles from "../../app/general.module.scss";
import Link from "next/link";
import { userServiceLogout } from "@/services/user.service";
import { useRouter } from "next/navigation";

const HeaderOperator = ({ isLoggedIn, color }) => {
  const navigate = useRouter();
  const handleLogout = () => {
    userServiceLogout()
      .then(() => {
        navigate.push("/login");
      })
      .catch((err) => console.error(err));
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center",
        marginRight: "2rem",
        gap: "2rem",
      }}
    >
      <Link
        style={{
          textDecoration: "none",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
        href="/reserves-panel-operator"
      >
        <h3
          style={
            color === "reserve-panel" ? { color: "#a442f1" } : { color: "#000" }
          }
        >
          Reservas
        </h3>
        {/* pasarle prop color */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.75 3C6.33579 3 6 3.33579 6 3.75H3C2.58579 3.75 2.25 4.08579 2.25 4.5V7.5V8.25V19.5C2.25 19.9142 2.58579 20.25 3 20.25H21C21.4142 20.25 21.75 19.9142 21.75 19.5V7.5V6.75V4.5C21.75 4.08579 21.4142 3.75 21 3.75H18C18 3.33579 17.6642 3 17.25 3C16.8358 3 16.5 3.33579 16.5 3.75H7.5C7.5 3.33579 7.16421 3 6.75 3ZM3.75 5.25H6C6 5.66421 6.33579 6 6.75 6C7.16421 6 7.5 5.66421 7.5 5.25H16.5C16.5 5.66421 16.8358 6 17.25 6C17.6642 6 18 5.66421 18 5.25H20.25V6.75H3.75V5.25ZM3.75 8.25H20.25V18.75H3.75V8.25ZM13.5 10.5C13.0858 10.5 12.75 10.8358 12.75 11.25V15.75C12.75 16.1642 13.0858 16.5 13.5 16.5H18C18.4142 16.5 18.75 16.1642 18.75 15.75V11.25C18.75 10.8358 18.4142 10.5 18 10.5H13.5ZM6.3 11.25C6.13431 11.25 6 11.3843 6 11.55V12.45C6 12.6157 6.13431 12.75 6.3 12.75H7.2C7.36569 12.75 7.5 12.6157 7.5 12.45V11.55C7.5 11.3843 7.36569 11.25 7.2 11.25H6.3ZM9.3 11.25C9.13431 11.25 9 11.3843 9 11.55V12.45C9 12.6157 9.13431 12.75 9.3 12.75H10.2C10.3657 12.75 10.5 12.6157 10.5 12.45V11.55C10.5 11.3843 10.3657 11.25 10.2 11.25H9.3ZM14.25 12H17.25V15H14.25V12ZM6.3 14.25C6.13431 14.25 6 14.3843 6 14.55V15.45C6 15.6157 6.13431 15.75 6.3 15.75H7.2C7.36569 15.75 7.5 15.6157 7.5 15.45V14.55C7.5 14.3843 7.36569 14.25 7.2 14.25H6.3ZM9.3 14.25C9.13431 14.25 9 14.3843 9 14.55V15.45C9 15.6157 9.13431 15.75 9.3 15.75H10.2C10.3657 15.75 10.5 15.6157 10.5 15.45V14.55C10.5 14.3843 10.3657 14.25 10.2 14.25H9.3Z"
            fill="black"
          />
        </svg>
      </Link>
      <Link
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "5px",
          textDecoration: "none",
        }}
        href="/user-details"
      >
        <h3
          style={
            color === "my-account" ? { color: "#a442f1" } : { color: "#000" }
          }
        >
          Mi cuenta
        </h3>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          style={{ width: "24", height: "24", flexShrink: "0" }}
        >
          <path
            d="M12 3C8.91668 3 6.4 5.57388 6.4 8.72727C6.4 10.6852 7.37631 12.4237 8.85 13.4574C6.21621 14.6033 4.32207 17.1599 4.03723 20.2008C3.99602 20.6407 4.35817 21 4.8 21C5.24183 21 5.59503 20.6402 5.64569 20.2013C6.02289 16.933 8.69138 14.4545 12 14.4545C15.3086 14.4545 17.9771 16.933 18.3543 20.2013C18.405 20.6402 18.7582 21 19.2 21C19.6418 21 20.004 20.6407 19.9628 20.2008C19.6779 17.1599 17.7838 14.6033 15.15 13.4574C16.6237 12.4237 17.6 10.6852 17.6 8.72727C17.6 5.57388 15.0833 3 12 3ZM12 4.63636C14.2186 4.63636 16 6.45824 16 8.72727C16 10.9963 14.2186 12.8182 12 12.8182C9.78139 12.8182 8 10.9963 8 8.72727C8 6.45824 9.78139 4.63636 12 4.63636Z"
            fill="black"
          />
        </svg>
      </Link>

      {isLoggedIn && (
        <div className="logout" style={{ marginLeft: "15px" }}>
          <Link style={{ textDecoration: "none" }} href="/login">
            <button onClick={handleLogout} className={styles.Btn}>
              <div className={styles.sign}>
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className={styles.text}>Logout</div>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HeaderOperator;
