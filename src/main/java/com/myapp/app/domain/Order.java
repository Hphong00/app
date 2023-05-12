package com.myapp.app.domain;

import java.io.Serializable;
import java.util.UUID;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Order.
 */
@Entity
@Table(name = "jhi_order")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Order implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "shipping_id")
    private UUID shippingId;

    @Column(name = "payment_id")
    private UUID paymentId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public UUID getId() {
        return this.id;
    }

    public Order id(UUID id) {
        this.setId(id);
        return this;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getUserId() {
        return this.userId;
    }

    public Order userId(UUID userId) {
        this.setUserId(userId);
        return this;
    }

    public void setUserId(UUID userId) {
        this.userId = userId;
    }

    public UUID getShippingId() {
        return this.shippingId;
    }

    public Order shippingId(UUID shippingId) {
        this.setShippingId(shippingId);
        return this;
    }

    public void setShippingId(UUID shippingId) {
        this.shippingId = shippingId;
    }

    public UUID getPaymentId() {
        return this.paymentId;
    }

    public Order paymentId(UUID paymentId) {
        this.setPaymentId(paymentId);
        return this;
    }

    public void setPaymentId(UUID paymentId) {
        this.paymentId = paymentId;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Order)) {
            return false;
        }
        return id != null && id.equals(((Order) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Order{" +
            "id=" + getId() +
            ", userId='" + getUserId() + "'" +
            ", shippingId='" + getShippingId() + "'" +
            ", paymentId='" + getPaymentId() + "'" +
            "}";
    }
}
