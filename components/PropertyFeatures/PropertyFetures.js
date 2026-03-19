import {
  faBath,
  faBed,
  faDog,
  faParking,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import numeral from "numeral";

export const PropertyFeatures = ({
  hasParking,
  petFriendly,
  bedrooms,
  bathrooms,
  price,
}) => {
  return (
    <div className="max-w-lg mx-auto my-10 bg-white text-slate-900 text-center p-5 ">
      <div className="grid grid-cols-2 mb-4 gap-y-5">
        <div>
          <FontAwesomeIcon icon={faBed} /> {bedrooms} Bedrooms
        </div>
        <div>
          <FontAwesomeIcon icon={faBath} /> {bathrooms} Bathrooms
        </div>
        <div>
          {!!petFriendly && (
            <>
              <FontAwesomeIcon icon={faDog} /> Pet Friendly
            </>
          )}
        </div>
        <div>
          {!!hasParking && (
            <>
              <FontAwesomeIcon icon={faParking} /> Parking Available
            </>
          )}
        </div>
      </div>
      <h3 className="text-5xl font-bold">£{numeral(price).format("0,0")}</h3>
    </div>
  );
};
