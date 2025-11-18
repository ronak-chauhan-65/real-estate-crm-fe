import React from "react";

function PropertyInfoDrawer({ property }) {
  if (!property) return null;

  return (
    <div className="p-4 space-y-6">
      {/* ───────────────── Property Overview ───────────────── */}
      <Section title="Property Information">
        <Row label="Building" value={property?.buildingName?.label} />
        <Row label="Property For" value={property?.propertyFor?.name} />
        <Row label="Type" value={property?.propertyType?.name} />
        <Row
          label="Specific Property"
          value={property?.specificProperty?.name}
        />
        <Row label="Configuration" value={property?.configuration?.name} />
        <Row label="Status" value={property?.status} />
      </Section>

      {/* ───────────────── Location ───────────────── */}
      <Section title="Location Details">
        <Row label="Address" value={property?.address} />
        <Row label="Area" value={property?.buildingName?.area?.area} />
        <Row label="Landmark" value={property?.landmark} />
        <Row label="Wing" value={property?.wing} />
        <Row label="Unit No" value={property?.unitNo} />
      </Section>

      {/* ───────────────── Area Details ───────────────── */}
      <Section title="Area Measurements">
        <Row
          label="Carpet Area"
          value={`${property?.carpetArea || ""} ${
            property?.carpetMeasurement?.name || ""
          }`}
        />
        <Row
          label="Super Built-up Area"
          value={`${property?.superBuiltUpArea || ""} ${
            property?.superBuiltUpMeasurement?.name || ""
          }`}
        />
        <Row
          label="Plot Area"
          value={`${property?.plotArea || ""} ${
            property?.plotMeasurement?.name || ""
          }`}
        />
        <Row
          label="Terrace"
          value={`${property?.terrace || ""} ${
            property?.terraceMeasurement?.name || ""
          }`}
        />
      </Section>

      {/* ───────────────── Pricing ───────────────── */}
      <Section title="Price & Status">
        <Row label="Price" value={property?.price} />
        <Row label="Price Remarks" value={property?.priceRemarks || "-"} />
        <Row label="Status" value={property?.status} />
        <Row
          label="Hot Property"
          value={property?.hotProperty ? "Yes" : "No"}
        />
        <Row
          label="Share To Brokers"
          value={property?.shareToOtherBrokers ? "Yes" : "No"}
        />
      </Section>

      {/* ───────────────── Furnishing & Parking ───────────────── */}
      <Section title="Furnishing & Parking">
        <Row label="Furnished Status" value={property?.furnishedStatus?.name} />
        <Row
          label="4-Wheeler Parking"
          value={property?.fourWheelerParking || "-"}
        />
        <Row
          label="2-Wheeler Parking"
          value={property?.twoWheelerParking || "-"}
        />
        <Row label="Priority" value={property?.priority?.name} />
        <Row label="Commission" value={property?.commission || "-"} />
      </Section>

      {/* ───────────────── Source & Reference ───────────────── */}
      <Section title="Source & Reference">
        <Row
          label="Source of Property"
          value={property?.sourceOfProperty?.name}
        />
        <Row label="Reference" value={property?.reference || "-"} />
      </Section>

      {/* ───────────────── Pre-Leased Details ───────────────── */}
      <Section title="Pre-Leased Information">
        <Row label="Pre-Leased" value={property?.preLeased ? "Yes" : "No"} />
        {property?.preLeased && (
          <Row label="Remarks" value={property?.preLeasedRemarks || "-"} />
        )}
      </Section>

      {/* ───────────────── Owner Details ───────────────── */}
      <Section title="Owner Details">
        <Row label="Owner" value={property?.owner?.name} />
        <Row label="Email" value={property?.email || "-"} />
        <Row label="NRI" value={property?.nri ? "Yes" : "No"} />
        <Row
          label="Owner Specific Contact"
          value={property?.ownerContactSpecificNo || "-"}
        />

        {/* Owner Contact List */}
        <div>
          <p className="font-semibold mb-1 text-gray-600">Owner Contacts:</p>
          {property?.ownerContactDetails?.map((c, index) => (
            <div key={index} className="border p-2 rounded mb-2">
              <Row label="Name" value={c.name || "-"} />
              <Row label="Contact No" value={c.contactNo || "-"} />
              <Row label="Status" value={c.status || "Not Contactable"} />
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────────── Unit Details ───────────────── */}
      <Section title="Unit Details">
        {property?.unitDetails?.map((u, index) => (
          <div key={index} className="border p-2 rounded mb-2">
            <Row label="Unit No" value={u.unitNo || "-"} />
            <Row label="Status" value={u.status || "-"} />
          </div>
        ))}
      </Section>

      {/* ───────────────── Caretaker ───────────────── */}
      <Section title="Caretaker Details">
        <Row label="Caretaker Name" value={property?.careTakerName || "-"} />
        <Row
          label="Caretaker Contact"
          value={property?.careTakerContactNo || "-"}
        />
        <Row label="Key Arrangement" value={property?.keyArrangement || "-"} />
        <Row
          label="Key in Office"
          value={property?.keyInOffice ? "Yes" : "No"}
        />
      </Section>

      {/* ───────────────── System Info ───────────────── */}
      <Section title="System Information">
        <Row
          label="Active Status"
          value={property?.activeStatus ? "Active" : "Inactive"}
        />
        <Row label="Created By" value={property?.createdBy?.name} />
        <Row label="Created At" value={formatDate(property?.createdAt)} />
        <Row label="Updated At" value={formatDate(property?.updatedAt)} />
      </Section>
    </div>
  );
}

export default PropertyInfoDrawer;

/* ───────────────────── Helper Components ───────────────────── */

const Section = ({ title, children }) => (
  <div className="border rounded-lg p-4 shadow-sm bg-white">
    <h2 className="text-lg font-semibold mb-3 text-info">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
  </div>
);

const Row = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value || "-"}</p>
  </div>
);

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString();
};
