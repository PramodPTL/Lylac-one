package com.salesmanager.core.services.storefront.Implementation;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.salesmanager.core.model.storefront.StorefrontEntity;
import com.salesmanager.core.services.storefront.Interfaces.StorefrontService;

public abstract class StorefrontServiceImpl<E extends StorefrontEntity> implements StorefrontService<E> {
    private final JpaRepository<E, Long> repository;
    protected StorefrontServiceImpl(JpaRepository<E, Long> repository) { this.repository = repository; }
    @Override public E get(Long id) { return repository.findById(id).orElse(null); }
    @Override public List<E> list() { return repository.findAll(); }
    @Override public E save(E entity) { return repository.save(entity); }
    @Override public void delete(E entity) { repository.delete(entity); }
}