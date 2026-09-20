package com.salesmanager.core.model.storefront;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "STORE_POLICY")
public class StorePolicy extends StorefrontEntity {
    private String policyType, title, content;
    private Boolean active = true;

    public String getPolicyType() {
        return policyType;
    }

    public void setPolicyType(String value) {
        policyType = value;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String value) {
        title = value;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String value) {
        content = value;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean value) {
        active = value;
    }
}
