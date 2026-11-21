package com.salesmanager.shop.model.storefront.delivery;

import java.io.Serializable;
import java.math.BigDecimal;

public class PersistableStoreDeliveryConfig implements Serializable {
    private static final long serialVersionUID = 1L;

    private boolean deliveryEnabled = true;
    private BigDecimal deliveryRadiusKm;
    private BigDecimal minimumOrderAmount;
    private BigDecimal deliveryCharge;
    private BigDecimal freeDeliveryAbove;
    private Integer estimatedDeliveryMin;
    private Integer estimatedDeliveryMax;
    private boolean sameDayDelivery;
    private boolean expressDelivery;
    private boolean pickupEnabled = true;

    public boolean isDeliveryEnabled() {
        return deliveryEnabled;
    }

    public void setDeliveryEnabled(boolean deliveryEnabled) {
        this.deliveryEnabled = deliveryEnabled;
    }

    public BigDecimal getDeliveryRadiusKm() {
        return deliveryRadiusKm;
    }

    public void setDeliveryRadiusKm(BigDecimal deliveryRadiusKm) {
        this.deliveryRadiusKm = deliveryRadiusKm;
    }

    public BigDecimal getMinimumOrderAmount() {
        return minimumOrderAmount;
    }

    public void setMinimumOrderAmount(BigDecimal minimumOrderAmount) {
        this.minimumOrderAmount = minimumOrderAmount;
    }

    public BigDecimal getDeliveryCharge() {
        return deliveryCharge;
    }

    public void setDeliveryCharge(BigDecimal deliveryCharge) {
        this.deliveryCharge = deliveryCharge;
    }

    public BigDecimal getFreeDeliveryAbove() {
        return freeDeliveryAbove;
    }

    public void setFreeDeliveryAbove(BigDecimal freeDeliveryAbove) {
        this.freeDeliveryAbove = freeDeliveryAbove;
    }

    public Integer getEstimatedDeliveryMin() {
        return estimatedDeliveryMin;
    }

    public void setEstimatedDeliveryMin(Integer estimatedDeliveryMin) {
        this.estimatedDeliveryMin = estimatedDeliveryMin;
    }

    public Integer getEstimatedDeliveryMax() {
        return estimatedDeliveryMax;
    }

    public void setEstimatedDeliveryMax(Integer estimatedDeliveryMax) {
        this.estimatedDeliveryMax = estimatedDeliveryMax;
    }

    public boolean isSameDayDelivery() {
        return sameDayDelivery;
    }

    public void setSameDayDelivery(boolean sameDayDelivery) {
        this.sameDayDelivery = sameDayDelivery;
    }

    public boolean isExpressDelivery() {
        return expressDelivery;
    }

    public void setExpressDelivery(boolean expressDelivery) {
        this.expressDelivery = expressDelivery;
    }

    public boolean isPickupEnabled() {
        return pickupEnabled;
    }

    public void setPickupEnabled(boolean pickupEnabled) {
        this.pickupEnabled = pickupEnabled;
    }
}
