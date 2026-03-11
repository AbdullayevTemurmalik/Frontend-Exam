import "./NotFound.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container not-found-wrap">
      <h1>{t("not_found_title")}</h1>
      <p>{t("not_found_text")}</p>
      <button className="red-btn">
        <Link to={"/"}>{t("back_home")}</Link>
      </button>
    </div>
  );
};

export default NotFound;
