package com.salesmanager.core.services.storefront.Interfaces;

import java.util.List;
import com.salesmanager.core.model.storefront.StorefrontEntity;

public interface StorefrontService<E extends StorefrontEntity> {
    E get(Long id);
    List<E> list();
    E save(E entity);
    void delete(E entity);
}