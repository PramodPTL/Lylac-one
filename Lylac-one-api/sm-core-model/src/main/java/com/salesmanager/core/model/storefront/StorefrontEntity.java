package com.salesmanager.core.model.storefront;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@MappedSuperclass
public abstract class StorefrontEntity implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "MERCHANT_ID", nullable = false)
    private Integer merchantId;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_CREATED", nullable = false)
    private Date dateCreated = new Date();
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_MODIFIED", nullable = false)
    private Date dateModified = new Date();
    @Column(name = "CREATED_BY")
    private Long createdBy;
    @Column(name = "MODIFIED_BY")
    private Long modifiedBy;
    @Column(name = "UPDT_ID", length = 60)
    private String updtId;

    public Long getId() {
        return id;
    }

    public void setId(Long value) {
        id = value;
    }

    public Integer getMerchantId() {
        return merchantId;
    }

    public void setMerchantId(Integer value) {
        merchantId = value;
    }

    public Date getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(Date value) {
        dateCreated = value;
    }

    public Date getDateModified() {
        return dateModified;
    }

    public void setDateModified(Date value) {
        dateModified = value;
    }

    public Long getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(Long value) {
        createdBy = value;
    }

    public Long getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(Long value) {
        modifiedBy = value;
    }

    public String getUpdtId() {
        return updtId;
    }

    public void setUpdtId(String value) {
        updtId = value;
    }
}