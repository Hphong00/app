package com.myapp.app.service.impl;

import com.myapp.app.domain.Shipping;
import com.myapp.app.repository.ShippingRepository;
import com.myapp.app.service.ShippingService;
import com.myapp.app.service.dto.ShippingDTO;
import com.myapp.app.service.mapper.ShippingMapper;
import java.util.Optional;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Shipping}.
 */
@Service
@Transactional
public class ShippingServiceImpl implements ShippingService {

    private final Logger log = LoggerFactory.getLogger(ShippingServiceImpl.class);

    private final ShippingRepository shippingRepository;

    private final ShippingMapper shippingMapper;

    public ShippingServiceImpl(ShippingRepository shippingRepository, ShippingMapper shippingMapper) {
        this.shippingRepository = shippingRepository;
        this.shippingMapper = shippingMapper;
    }

    @Override
    public ShippingDTO save(ShippingDTO shippingDTO) {
        log.debug("Request to save Shipping : {}", shippingDTO);
        Shipping shipping = shippingMapper.toEntity(shippingDTO);
        shipping = shippingRepository.save(shipping);
        return shippingMapper.toDto(shipping);
    }

    @Override
    public ShippingDTO update(ShippingDTO shippingDTO) {
        log.debug("Request to update Shipping : {}", shippingDTO);
        Shipping shipping = shippingMapper.toEntity(shippingDTO);
        shipping = shippingRepository.save(shipping);
        return shippingMapper.toDto(shipping);
    }

    @Override
    public Optional<ShippingDTO> partialUpdate(ShippingDTO shippingDTO) {
        log.debug("Request to partially update Shipping : {}", shippingDTO);

        return shippingRepository
            .findById(shippingDTO.getId())
            .map(existingShipping -> {
                shippingMapper.partialUpdate(existingShipping, shippingDTO);

                return existingShipping;
            })
            .map(shippingRepository::save)
            .map(shippingMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<ShippingDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Shippings");
        return shippingRepository.findAll(pageable).map(shippingMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ShippingDTO> findOne(UUID id) {
        log.debug("Request to get Shipping : {}", id);
        return shippingRepository.findById(id).map(shippingMapper::toDto);
    }

    @Override
    public void delete(UUID id) {
        log.debug("Request to delete Shipping : {}", id);
        shippingRepository.deleteById(id);
    }
}
