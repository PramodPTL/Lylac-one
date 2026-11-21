package com.salesmanager.core.model.storefront;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.salesmanager.core.model.merchant.MerchantStore;

@Entity
@Table(name = "STORE_DELIVERY_CONFIG", schema = "lylac_storefront")
public class StoreDeliveryConfig extends StorefrontEntity {

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false, unique = true)
    private MerchantStore merchantStore;

    @Column(name = "DELIVERY_ENABLED", nullable = false)
    private boolean deliveryEnabled = true;

    @Column(name = "DELIVERY_RADIUS_KM", precision = 8, scale = 2)
    private BigDecimal deliveryRadiusKm;

    @Column(name = "MINIMUM_ORDER_AMOUNT", precision = 15, scale = 2)
    private BigDecimal minimumOrderAmount;

    @Column(name = "DELIVERY_CHARGE", precision = 15, scale = 2)
    private BigDecimal deliveryCharge;

    @Column(name = "FREE_DELIVERY_ABOVE", precision = 15, scale = 2)
    private BigDecimal freeDeliveryAbove;

    @Column(name = "ESTIMATED_DELIVERY_MIN")
    private Integer estimatedDeliveryMin;

    @Column(name = "ESTIMATED_DELIVERY_MAX")
    private Integer estimatedDeliveryMax;

    @Column(name = "SAME_DAY_DELIVERY")
    private boolean sameDayDelivery;

    @Column(name = "EXPRESS_DELIVERY")
    private boolean expressDelivery;

    @Column(name = "PICKUP_ENABLED", nullable = false)
    private boolean pickupEnabled = true;

    // Getters & Setters

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

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