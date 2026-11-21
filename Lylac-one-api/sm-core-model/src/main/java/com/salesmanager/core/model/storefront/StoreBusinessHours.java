package com.salesmanager.core.model.storefront;

import java.time.LocalTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.salesmanager.core.model.merchant.MerchantStore;

@Entity
@Table(name = "STORE_BUSINESS_HOURS", schema = "lylac_storefront")
public class StoreBusinessHours extends StorefrontEntity {

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "MERCHANT_ID", nullable = false)
    private MerchantStore merchantStore;

    @Column(name = "DAY_OF_WEEK", nullable = false)
    private Integer dayOfWeek;

    @Column(name = "OPENING_TIME")
    private LocalTime openingTime;

    @Column(name = "CLOSING_TIME")
    private LocalTime closingTime;

    @Column(name = "IS_CLOSED", nullable = false)
    private boolean closed = false;

    @Column(name = "IS_24_HOURS", nullable = false)
    private boolean twentyFourHours = false;

    public MerchantStore getMerchantStore() {
        return merchantStore;
    }

    public void setMerchantStore(MerchantStore merchantStore) {
        this.merchantStore = merchantStore;
    }

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer dayOfWeek) {
        this.dayOfWeek = dayOfWeek;
    }

    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(LocalTime openingTime) {
        this.openingTime = openingTime;
    }

    public LocalTime getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(LocalTime closingTime) {
        this.closingTime = closingTime;
    }

    public boolean isClosed() {
        return closed;
    }

    public void setClosed(boolean closed) {
        this.closed = closed;
    }

    public boolean isTwentyFourHours() {
        return twentyFourHours;
    }

    public void setTwentyFourHours(boolean twentyFourHours) {
        this.twentyFourHours = twentyFourHours;
    }
}