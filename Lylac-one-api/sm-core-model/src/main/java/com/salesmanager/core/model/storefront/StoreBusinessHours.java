package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_BUSINESS_HOURS")
public class StoreBusinessHours extends StorefrontEntity {
    private Integer dayOfWeek;
    private String openingTime, closingTime;
    private Boolean closed = false, twentyFourHours = false;

    public Integer getDayOfWeek() {
        return dayOfWeek;
    }

    public void setDayOfWeek(Integer value) {
        dayOfWeek = value;
    }

    public String getOpeningTime() {
        return openingTime;
    }

    public void setOpeningTime(String value) {
        openingTime = value;
    }

    public String getClosingTime() {
        return closingTime;
    }

    public void setClosingTime(String value) {
        closingTime = value;
    }

    public Boolean getClosed() {
        return closed;
    }

    public void setClosed(Boolean value) {
        closed = value;
    }

    public Boolean getTwentyFourHours() {
        return twentyFourHours;
    }

    public void setTwentyFourHours(Boolean value) {
        twentyFourHours = value;
    }
}
