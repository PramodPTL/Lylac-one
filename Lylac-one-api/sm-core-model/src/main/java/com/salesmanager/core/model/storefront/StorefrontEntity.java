package com.salesmanager.core.model.storefront;

import lombok.Getter;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Getter
@MappedSuperclass
public abstract class StorefrontEntity implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_CREATED")
    private Date dateCreated = new Date();

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "DATE_MODIFIED")
    private Date dateModified = new Date();

    @Column(name = "CREATED_BY")
    private Long createdBy;

    @Column(name = "MODIFIED_BY")
    private Long modifiedBy;

    @Column(name = "UPDT_ID", length = 60)
    private String updtId;

    public void setId(Long value) {
        id = value;
    }


    public void setDateCreated(Date value) {
        dateCreated = value;
    }

    public void setDateModified(Date value) {
        dateModified = value;
    }

    public void setCreatedBy(Long value) {
        createdBy = value;
    }

    public void setModifiedBy(Long value) {
        modifiedBy = value;
    }

    public void setUpdtId(String value) {
        updtId = value;
    }
}