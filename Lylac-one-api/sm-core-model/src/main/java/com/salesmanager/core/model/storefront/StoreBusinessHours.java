package com.salesmanager.core.model.storefront;

import java.time.LocalTime;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_BUSINESS_HOURS", schema = "lylac_storefront")
public class StoreBusinessHours extends StorefrontEntity {
    @javax.persistence.Column(name = "DAY_OF_WEEK")
    private Integer dayOfWeek;
    @javax.persistence.Column(name = "OPENING_TIME")
    private LocalTime openingTime;
    @javax.persistence.Column(name = "CLOSING_TIME")
    private LocalTime closingTime;
    @javax.persistence.Column(name = "IS_CLOSED")
    private Boolean closed = false;
    @javax.persistence.Column(name = "IS_24_HOURS")
    private Boolean twentyFourHours = false;

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public LocalTime getOpeningTime() {
        return openingTime;
    }

    public LocalTime getClosingTime() {
        return closingTime;
    }

    public Boolean getClosed() {
        return closed;
    }

    public Boolean getTwentyFourHours() {
        return twentyFourHours;
    }

    public void setDayOfWeek(Integer value) {
        dayOfWeek = value;
    }

    public void setOpeningTime(LocalTime value) {
        openingTime = value;
    }

    public void setClosingTime(LocalTime value) {
        closingTime = value;
    }

    public void setClosed(Boolean value) {
        closed = value;
    }

    public void setTwentyFourHours(Boolean value) {
        twentyFourHours = value;
    }
}
