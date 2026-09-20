package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_THEME_CONFIG")
public class StoreThemeConfig extends StorefrontEntity {
    private String themeName, primaryColor, secondaryColor, logoUrl, faviconUrl, configuration;
    private Boolean active = true;

    public String getThemeName() {
        return themeName;
    }

    public void setThemeName(String value) {
        themeName = value;
    }

    public String getPrimaryColor() {
        return primaryColor;
    }

    public void setPrimaryColor(String value) {
        primaryColor = value;
    }

    public String getSecondaryColor() {
        return secondaryColor;
    }

    public void setSecondaryColor(String value) {
        secondaryColor = value;
    }

    public String getLogoUrl() {
        return logoUrl;
    }

    public void setLogoUrl(String value) {
        logoUrl = value;
    }

    public String getFaviconUrl() {
        return faviconUrl;
    }

    public void setFaviconUrl(String value) {
        faviconUrl = value;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String value) {
        configuration = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
