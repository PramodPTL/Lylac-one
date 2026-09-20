package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_DELIVERY_CONFIG")
public class StoreDeliveryConfig extends StorefrontEntity {
    private Boolean deliveryEnabled = true, pickupEnabled = true;
    private java.math.BigDecimal minimumOrderAmount, deliveryCharge;
    private String estimatedDeliveryTime;
    private Boolean active = true;

    public Boolean getDeliveryEnabled() {
        return deliveryEnabled;
    }

    public void setDeliveryEnabled(Boolean value) {
        deliveryEnabled = value;
    }

    public Boolean getPickupEnabled() {
        return pickupEnabled;
    }

    public void setPickupEnabled(Boolean value) {
        pickupEnabled = value;
    }

    public java.math.BigDecimal getMinimumOrderAmount() {
        return minimumOrderAmount;
    }

    public void setMinimumOrderAmount(java.math.BigDecimal value) {
        minimumOrderAmount = value;
    }

    public java.math.BigDecimal getDeliveryCharge() {
        return deliveryCharge;
    }

    public void setDeliveryCharge(java.math.BigDecimal value) {
        deliveryCharge = value;
    }

    public String getEstimatedDeliveryTime() {
        return estimatedDeliveryTime;
    }

    public void setEstimatedDeliveryTime(String value) {
        estimatedDeliveryTime = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
