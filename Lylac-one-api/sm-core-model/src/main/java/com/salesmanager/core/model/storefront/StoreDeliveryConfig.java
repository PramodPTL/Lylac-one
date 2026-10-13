package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_DELIVERY_CONFIG", schema = "lylac_storefront")
public class StoreDeliveryConfig extends StorefrontEntity {
    @javax.persistence.Column(name = "DELIVERY_ENABLED")
    private Boolean deliveryEnabled = true;
    @javax.persistence.Column(name = "DELIVERY_RADIUS_KM", precision = 8, scale = 2)
    private java.math.BigDecimal deliveryRadiusKm;
    @javax.persistence.Column(name = "MINIMUM_ORDER_AMOUNT", precision = 15, scale = 2)
    private java.math.BigDecimal minimumOrderAmount;
    @javax.persistence.Column(name = "DELIVERY_CHARGE", precision = 15, scale = 2)
    private java.math.BigDecimal deliveryCharge;
    @javax.persistence.Column(name = "FREE_DELIVERY_ABOVE", precision = 15, scale = 2)
    private java.math.BigDecimal freeDeliveryAbove;
    @javax.persistence.Column(name = "ESTIMATED_DELIVERY_MIN")
    private Integer estimatedDeliveryMin;
    @javax.persistence.Column(name = "ESTIMATED_DELIVERY_MAX")
    private Integer estimatedDeliveryMax;
    @javax.persistence.Column(name = "SAME_DAY_DELIVERY")
    private Boolean sameDayDelivery;
    @javax.persistence.Column(name = "EXPRESS_DELIVERY")
    private Boolean expressDelivery;
    @javax.persistence.Column(name = "PICKUP_ENABLED")
    private Boolean pickupEnabled = true;

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

    public java.math.BigDecimal getDeliveryRadiusKm() {
        return deliveryRadiusKm;
    }

    public void setDeliveryRadiusKm(java.math.BigDecimal value) {
        deliveryRadiusKm = value;
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

    public Boolean getSameDayDelivery() {
        return sameDayDelivery;
    }

    public void setSameDayDelivery(Boolean value) {
        sameDayDelivery = value;
    }

    public Boolean getExpressDelivery() {
        return expressDelivery;
    }

    public void setExpressDelivery(Boolean value) {
        expressDelivery = value;
    }
}
