package com.salesmanager.core.model.storefront;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.salesmanager.core.model.merchant.MerchantStore;

@Entity
@Table(name = "STORE_DELIVERY_ZONE", schema = "lylac_storefront")
public class StoreDeliveryZone extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @Column(name = "ZONE_NAME", length = 150, nullable = false)
    private String zoneName;

    @Column(name = "POSTAL_CODE", length = 15)
    private String postalCode;

    @Column(name = "DELIVERY_CHARGE", precision = 15, scale = 2)
    private BigDecimal deliveryCharge;

    @Column(name = "MINIMUM_ORDER_AMOUNT", precision = 15, scale = 2)
    private BigDecimal minimumOrderAmount;

    @Column(name = "FREE_DELIVERY_ABOVE", precision = 15, scale = 2)
    private BigDecimal freeDeliveryAbove;

    @Column(name = "ESTIMATED_DELIVERY_MIN")
    private Integer estimatedDeliveryMin;

    @Column(name = "ESTIMATED_DELIVERY_MAX")
    private Integer estimatedDeliveryMax;

    @Column(name = "IS_ACTIVE", nullable = false)
    private boolean active = true;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

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