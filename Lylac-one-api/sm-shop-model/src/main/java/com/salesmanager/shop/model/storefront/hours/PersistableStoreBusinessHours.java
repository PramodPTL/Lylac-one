package com.salesmanager.shop.model.storefront.hours;

import java.io.Serializable;
import java.time.LocalTime;

public class PersistableStoreBusinessHours implements Serializable {
    private static final long serialVersionUID = 1L;

    private Integer dayOfWeek;
    private LocalTime openingTime;
    private LocalTime closingTime;
    private boolean closed;
    private boolean twentyFourHours;

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
