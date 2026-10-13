package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_DELIVERY_ZONE", schema = "lylac_storefront")
public class StoreDeliveryZone extends StorefrontEntity {
    @javax.persistence.Column(name = "ZONE_NAME", length = 150)
    private String zoneName;
    @javax.persistence.Column(name = "POSTAL_CODE", length = 15)
    private String postalCode;
    @javax.persistence.Column(name = "DELIVERY_CHARGE", precision = 15, scale = 2)
    private java.math.BigDecimal deliveryCharge;
    @javax.persistence.Column(name = "MINIMUM_ORDER_AMOUNT", precision = 15, scale = 2)
    private java.math.BigDecimal minimumOrderAmount;
    @javax.persistence.Column(name = "FREE_DELIVERY_ABOVE", precision = 15, scale = 2)
    private java.math.BigDecimal freeDeliveryAbove;
    @javax.persistence.Column(name = "ESTIMATED_DELIVERY_MIN")
    private Integer estimatedDeliveryMin;
    @javax.persistence.Column(name = "ESTIMATED_DELIVERY_MAX")
    private Integer estimatedDeliveryMax;
    @javax.persistence.Column(name = "IS_ACTIVE")
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

    public java.math.BigDecimal getMinimumOrderAmount() {
        return minimumOrderAmount;
    }

    public void setMinimumOrderAmount(java.math.BigDecimal value) {
        minimumOrderAmount = value;
    }

    public java.math.BigDecimal getFreeDeliveryAbove() {
        return freeDeliveryAbove;
    }

    public void setFreeDeliveryAbove(java.math.BigDecimal value) {
        freeDeliveryAbove = value;
    }

    public Integer getEstimatedDeliveryMin() {
        return estimatedDeliveryMin;
    }

    public void setEstimatedDeliveryMin(Integer value) {
        estimatedDeliveryMin = value;
    }

    public Integer getEstimatedDeliveryMax() {
        return estimatedDeliveryMax;
    }

    public void setEstimatedDeliveryMax(Integer value) {
        estimatedDeliveryMax = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
