package com.salesmanager.shop.model.storefront.delivery;

import java.io.Serializable;
import java.math.BigDecimal;

public class PersistableStoreDeliveryZone implements Serializable {
    private static final long serialVersionUID = 1L;

    private String zoneName;
    private String postalCode;
    private BigDecimal deliveryCharge;
    private BigDecimal minimumOrderAmount;
    private BigDecimal freeDeliveryAbove;
    private Integer estimatedDeliveryMin;
    private Integer estimatedDeliveryMax;
    private boolean active = true;

    public String getZoneName() {
        return zoneName;
    }

    public void setZoneName(String zoneName) {
        this.zoneName = zoneName;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public BigDecimal getDeliveryCharge() {
        return deliveryCharge;
    }

    public void setDeliveryCharge(BigDecimal deliveryCharge) {
        this.deliveryCharge = deliveryCharge;
    }

    public BigDecimal getMinimumOrderAmount() {
        return minimumOrderAmount;
    }

    public void setMinimumOrderAmount(BigDecimal minimumOrderAmount) {
        this.minimumOrderAmount = minimumOrderAmount;
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

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
