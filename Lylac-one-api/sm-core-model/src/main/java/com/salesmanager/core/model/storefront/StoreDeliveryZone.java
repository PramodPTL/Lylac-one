package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_DELIVERY_ZONE")
public class StoreDeliveryZone extends StorefrontEntity {
    private String zoneName, postalCode;
    private java.math.BigDecimal deliveryCharge;
    private Integer estimatedMinutes;
    private Boolean active = true;

    public String getZoneName() {
        return zoneName;
    }

    public void setZoneName(String value) {
        zoneName = value;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String value) {
        postalCode = value;
    }

    public java.math.BigDecimal getDeliveryCharge() {
        return deliveryCharge;
    }

    public void setDeliveryCharge(java.math.BigDecimal value) {
        deliveryCharge = value;
    }

    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer value) {
        estimatedMinutes = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
